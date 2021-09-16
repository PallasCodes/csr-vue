<template>
  <main class="container py-5">
    <h2 class="text-center">Tasks</h2>
    <div class="row justify-content-center">
      <div class="col-4">
        <form @submit.prevent="sendData" class="py-4" autocomplete="off">
         <div class="mb-3">
            <label for="title" class="form-label" >Title</label>
            <input type="text" class="form-control" id="title"
              v-model="task.title">
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea class="form-control" id="description" 
              v-model="task.description"></textarea>
          </div>
          <button type="submit" class="btn w-100" 
            :class="getFormMode === 'Create' ? 'btn-primary' : 'btn-success'">{{ getFormMode }}</button>
        </form>
      </div>
    </div>

    <div class="row justify-content-center my-4">
      <div class="col-4">
        <!-- TASKS -->
        <div class="card shadow-sm my-2"
        v-for="task in getTasks" :key="task._id">
          <div class="card-body">
            <h5 class="card-title">
              {{ task.title }}
            </h5>
            <div class="card-text">
              {{ task.description }}
              <div class="d-flex mt-3">
                <button class="btn btn-sm btn-success text-white me-1" type="button"
                  @click="changeMode(task)">Update</button>
                <button class="btn btn-sm btn-danger" type="button"
                  @click="deleteTask(task._id)">Delete</button>
              </div>
            </div>
          </div>
        </div>
        <!-- END TASKS -->
      </div>
    </div>
</main>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      tasks: [],
      task: {
        title: '',
        description: '',
        _id: ''
      },
      formMode: 'Create'
    }
  },
  computed: {
    getTasks() {
      return this.tasks
    },
    getFormMode() {
      return this.formMode
    }
  },
  methods: {
    deleteTask(taskId) {
      axios
        .delete('/tasks/' + taskId)
        .then(() => this.tasks = this.tasks.filter(task => task._id !== taskId))
        .catch(error => console.error(error))
    },
    changeMode(task) {
      this.task.title = task.title
      this.task.description = task.description
      this.task._id = task._id

      this.formMode = 'Update'
    },
    sendData() {
      if(this.formMode === 'Create') {
        axios
          .post('/tasks', {
            title: this.task.title,
            description: this.task.description
          })
          .then(result => {
            this.tasks.unshift(result.data)
            this.task.taskId = ''
            this.task.title = ''
            this.task.description = ''
          })
          .catch(error => console.error(error))
      } else if (this.formMode === 'Update') {
        axios
          .put('/tasks/' + this.task._id, {
            title: this.task.title,
            description: this.task.description
          })
          .then(() => {
            this.tasks.forEach(task => {
              if(task._id === this.task._id) {
                task.title = this.task.title
                task.description = this.task.description
              }
            })
            this.task.taskId = ''
            this.task.title = ''
            this.task.description = ''
            this.formMode = 'Create'
          })
          .catch(error => console.error(error))
      }
    }
  },
  beforeCreate() {
    axios
      .get('/tasks')
      .then(response => this.tasks = response.data)
      .catch(error => console.error(error))
  }
}
</script> 