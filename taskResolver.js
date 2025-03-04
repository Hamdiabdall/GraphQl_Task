const { Level } = require('level');
const db = new Level('./taskDB', { valueEncoding: 'json' });

const taskResolver = {
  Query: {
    task: async (_, { id }) => {
      try {
        return await db.get(id);
      } catch (err) {
        console.error("Task not found:", err);
        return null;
      }
    },
    tasks: async () => {
      const tasks = [];
      for await (const [key, value] of db.iterator()) {
        tasks.push(value);
      }
      return tasks;
    },
  },

  Mutation: {
    addTask: async (_, { title, description, completed, duration }) => {
      const id = Date.now().toString(); // Unique ID based on timestamp
      const task = { id, title, description, completed, duration };
      await db.put(id, task);
      return task;
    },

    completeTask: async (_, { id }) => {
      try {
        const task = await db.get(id);
        task.completed = true;
        await db.put(id, task);
        return task;
      } catch (err) {
        console.error("Task not found:", err);
        return null;
      }
    },

    changeDescription: async (_, { id, description }) => {
      try {
        const task = await db.get(id);
        task.description = description;
        await db.put(id, task);
        return task;
      } catch (err) {
        console.error("Task not found:", err);
        return null;
      }
    },

    deleteTask: async (_, { id }) => {
      try {
        await db.del(id);
        return true;
      } catch (err) {
        console.error("Task not found:", err);
        return false;
      }
    },
  },
};

module.exports = taskResolver;
