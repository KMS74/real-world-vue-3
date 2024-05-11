import apiClient from '@/utils/axios-config'

class EventService {
  async getEvents(perPage, page) {
    return await apiClient.get(`/events?_limit=${perPage}&_page=${page}`)
  }

  async getEvent(id) {
    const response = await apiClient.get('/events/' + id)
    return response.data
  }
}

export default new EventService()
