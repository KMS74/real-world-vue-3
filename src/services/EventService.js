import apiClient from '@/utils/axios-config'

class EventService {
  async getEvents(perPage, page) {
    try {
      return await apiClient.get(`/events?_limit=${perPage}&_page=${page}`)
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
