// src/store.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";

const useStore = create(
  persist(
    (set, get) => ({
      collections: [],
      selectedCollection: null,
      isDarkTheme: false, // Dark theme state
      user: null,
      token: null,
      tasks: [],
      completedTasks: [],
      // updateCollection: (id, payload) => {
      //   const { collections } = get();
      //   const updatedCollections = collections.map((collection) => {
      //     if (collection._id === id) {
      //       return { ...collection, ...payload };
      //     }
      //     return collection;
      //   });
      //   set({ collections: updatedCollections });
      // },
      updateCollectionLocal: (id, newTask) => {
        const { collections } = get();
        const updatedCollections = collections.map((collection) =>
          collection._id === id
            ? { ...collection, tasks: [...(collection.tasks || []), newTask] }
            : collection
        );
      
        set({ collections: updatedCollections });
      },
      deleteCollectionLocal: (id) => {
        const { collections } = get();
        const updatedCollections = collections.filter(
          (collection) => collection._id !== id
        );
        set({ collections: updatedCollections });
      },
      setTasks: (newTasks) => {
        set({ tasks: newTasks });
      },
      EditCollectionLocal: (id, payload) => {
        const { collections } = get();
        const updatedCollections = collections.map((collection) => {
          if (collection._id === id) {
            return { ...collection, ...payload };
          }
          return collection;
        });
        set({ collections: updatedCollections });
      },
      toggleFavoriteLocal: (collection) => {
        const collectionId = collection._id;
        const { collections, selectedCollection } = get();
    
        const updatedCollections = collections.map((col) =>
            col._id === collectionId ? { ...col, isFavorite: !col.isFavorite } : col
        );
    
        set({ collections: updatedCollections });
    
        // Update selectedCollection only if it matches the toggled collection
        if (selectedCollection?._id === collectionId) {
            set({ selectedCollection: { ...selectedCollection, isFavorite: !selectedCollection.isFavorite } });
        }
    },
    
      updateTask: (id, payload) => {
        const { tasks } = get();
        const updatedTasks = tasks.map((task) => {
          if (task._id === id) {
            return { ...payload };
          }
          return task;
        });
        set({ tasks: updatedTasks });
        get().setCompletedTasks();
      },
      //deleteTask
      deleteTask: (id) => {
        const { tasks } = get();
        const updatedTasks = tasks.filter((task) => task._id !== id);
        set({ tasks: updatedTasks });
      },
      createLocalTask: (task) => {
        const { tasks } = get();
        set({ tasks: [...tasks, task] });
        get().setCompletedTasks();
      },
     
   
 getTasksByParentId: (showCompleted) => {
      const { tasks } = get(); // Retrieve tasks from store
      const group = {};
      if (!tasks) return group;
    
      // Create a task lookup map for quick parent-child resolution
      const taskMap = new Map();
      tasks.forEach((task) => taskMap.set(task._id, task));
    
      // Helper function to determine if a task is effectively completed
      const isTaskCompleted = (task) => {
          if (task.completed) return true;
          
          const parentTask = taskMap.get(task.parent_id);
          return parentTask ? isTaskCompleted(parentTask) : false;
      };
    
      // Group tasks by parent_id
      tasks.forEach((task) => {
          const effectiveCompleted = isTaskCompleted(task);
    
          // Only include tasks if they match the `showCompleted` filter
          if (!task.parent_id) {
            if (!showCompleted && effectiveCompleted) return; 
            if(showCompleted && !effectiveCompleted) return; // Skip completed tasks if showCompleted is false
            
            // Skip completed parents if showCompleted is false
        }
              const parentId = task.parent_id || null;
              group[parentId] ||= [];
              group[parentId].push({ ...task, completed: effectiveCompleted }); // Avoid modifying original task
          
      });
    
      return group;
    },
//   getTasksByParentId: (showCompleted) => {
//     const { tasks } = get();
//     const group = {};
//     if (!tasks) return group;

//     // Create a task lookup map for quick parent-child resolution
//     const taskMap = new Map();
//     tasks.forEach((task) => taskMap.set(task._id, task));

//     // Helper function to determine if a task is effectively completed (iterative approach)
//     const isTaskCompleted = (task) => {
//         let currentTask = task;
//         const visited = new Set(); // Track visited nodes to prevent infinite loops

//         while (currentTask) {
//             if (visited.has(currentTask._id)) return false; // Prevent cycles
//             visited.add(currentTask._id);

//             if (currentTask.completed) return true; // If any task in the hierarchy is completed, return true

//             currentTask = taskMap.get(currentTask.parent_id); // Move up the hierarchy
//         }

//         return false; // No parent task is completed
//     };

//     // Group tasks by parent_id
//     tasks.forEach((task) => {
//         const effectiveCompleted = isTaskCompleted(task);

//         // Skip tasks based on `showCompleted`
//         if (!showCompleted && effectiveCompleted) return; // Hide completed tasks
//         if (showCompleted && !effectiveCompleted) return; // Show only completed tasks

//         const parentId = task.parent_id || null;
//         group[parentId] ||= [];
//         group[parentId].push({ ...task, completed: effectiveCompleted });
//     });

//     return group;
// },

    getGroupedTasks: (parentId, showCompleted) => {
        const tasksByParentId = get().getTasksByParentId(showCompleted);
        return tasksByParentId[parentId] || [];
    },

      rootTask: () => {
        const TasksByParentId = get().getTasksByParentId();
        return TasksByParentId[null];
      },
      setCompletedTasks: () => {
        const { tasks } = get();
        const filtedTask = tasks.filter((task) => task.completed === true);
        set({ completedTasks: filtedTask });
      },
      // Toggle theme
      toggleTheme: () => {
        set((state) => {
          const newTheme = !state.isDarkTheme;
          document.documentElement.classList.toggle("dark", newTheme); // Apply theme class to <html>
          return { isDarkTheme: newTheme };
        });
      },

      // Initialize theme on app start
      initializeTheme: () => {
        const { isDarkTheme } = get();
        document.documentElement.classList.toggle("dark", isDarkTheme);
      },

      // Set the selected collection
      setSelectedCollection: (collection) =>
        set({ selectedCollection: collection }),

      // Fetch collections from the backend
      fetchCollections: async () => {
        const { token } = get();
        try {
          const response = await axios.get("/collections", {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          });
          set({ collections: response.data });
        } catch (error) {
          console.error("Error fetching collections:", error);
        }
      },
      login: async (email, password) => {
        try {
          const response = await axios.post("/auth/login", { email, password });
          const { user, token } = response.data;
          set({ user, token });
          return true;
        } catch (error) {
          console.error("Error logging in:", error);
          return false;
        }
      },
      
      // Add a new collection
      addCollection: async () => {
        const { collections, token } = get();
        const newCollection = {
          name: `New Collection ${collections.length + 1}`,
          icon: "📋",
          isFavorite: false,
        };
        try {
          const response = await axios.post("/collections", newCollection, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          });
          set((state) => ({
            collections: [...state.collections, response.data],
          }));
        } catch (error) {
          console.error("Error adding collection:", error);
        }
      },

      // Logout user
      logout: () => {
        set({
          user: null,
          token: null,
          collections: [],
          selectedCollection: null,
        });
      },
    }),
    {
      name: "todo-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isDarkTheme: state.isDarkTheme,
        user: state.user,
        token: state.token,
      }), // Persist theme, user, and token
    }
  )
);

// Initialize theme when the store is imported
useStore.getState().initializeTheme();

export default useStore;

// 
