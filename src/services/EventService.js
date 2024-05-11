import apiClient from '@/utils/axios-config'

class EventService {
  async getEvents() {
    try {
      const response = await apiClient.get('/events')
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async getEvent(id) {
    try {
      const response = await apiClient.get('/events/' + id)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
}

export default new EventService()
