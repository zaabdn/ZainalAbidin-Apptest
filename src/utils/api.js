import axios from "axios"

const baseUrl = "https://simple-contact-crud.herokuapp.com"

export const getListContact = async () => {
  try {
    const uri = `${baseUrl}/contact`
    const res = await axios({
      method: "GET",
      url: uri,
    })
    return res?.data
  } catch (error) {
    return error?.response?.data || error
  }
}

export const getListContactById = async (id) => {
  try {
    const uri = `${baseUrl}/contact/${id}`
    const res = await axios({
      method: "GET",
      url: uri,
    })
    return res?.data
  } catch (error) {
    return error?.response?.data || error
  }
}

export const getPostContact = async (payload) => {
  try {
    const uri = `${baseUrl}/contact`
    const res = await axios({
      method: "POST",
      url: uri,
      data: payload,
    })
    return res
  } catch (error) {
    return error?.response?.data || error
  }
}

export const getPutContact = async (id, payload) => {
  try {
    const uri = `${baseUrl}/contact/${id}`
    const res = await axios({
      method: "PUT",
      url: uri,
      data: payload,
    })
    return res
  } catch (error) {
    return error?.response?.data || error
  }
}

export const getDeleteContact = async (id) => {
  try {
    const uri = `${baseUrl}/contact/${id}`
    const res = await axios({
      method: "DELETE",
      url: uri,
    })
    return res
  } catch (error) {
    return error?.response?.data || error
  }
}
