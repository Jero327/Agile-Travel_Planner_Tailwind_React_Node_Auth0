import React from 'react'
import { useNavigate } from 'react-router-dom'
import useTravelDetails from '../hooks/useTravelDetails'
import { useAuth0 } from '@auth0/auth0-react'

import { z } from 'zod'
import { addTravelDetails } from '../apis/traveDetails'

const tripSchema = z.object({
  city: z.string(),
  start_date: z.string(),
  end_date: z.string(),
})

function SelectTrip() {
  const navigate = useNavigate()
  const cities = [
    'Auckland',
    'Paris',
    'Sydney',
    'Tokyo',
    'New York',
    'Singapore',
    'Dubai',
    'Rome',
    'Istanbul',
    'Wellington',
  ]

  const { getAccessTokenSilently } = useAuth0()

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const city = formData.get('selectedCity')
    const startDateInput = formData.get('departureDate')
    const endDateInput = formData.get('returnDate')
    1
    const inputData = {
      city: city,
      start_date: startDateInput,
      end_date: endDateInput,
    }

    const accessToken = await getAccessTokenSilently()

    const result = tripSchema.safeParse(inputData)

    if (!result.success) {
      alert(result.error)
      return
    }

    const resId = await addTravelDetails(accessToken, result.data)
    console.log(resId.body[0])

    navigate(
      `/explore?city=${city}&start=${startDateInput}&end=${endDateInput}&tripId=${resId.body[0]}`
    )
  }

  return (
    <div className="container mx-auto py-8 ">
      <form
        onSubmit={handleFormSubmit}
        className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg"
      >
        <div className="mb-4 text-lg">
          <label
            htmlFor="cities"
            className="block mb-2 text-lg font-semibold text-gray-900"
          >
            Select a city
          </label>
          <select
            id="cities"
            className="form-select block w-3/4 px-4 py-2 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="selectedCity"
          >
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="departureDate"
            className="block mb-2 text-lg font-semibold text-gray-900"
          >
            From:
          </label>
          <input
            type="date"
            id="departureDate"
            name="departureDate"
            className="form-input block w-3/4 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="returnDate"
            className="block mb-2 text-lg font-semibold text-gray-900"
          >
            To:
          </label>
          <input
            type="date"
            id="returnDate"
            name="returnDate"
            className="form-input block w-3/4 rounded-lg"
          />
        </div>

        <div>
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Start planning
          </button>
        </div>
      </form>
    </div>
  )
}

export default SelectTrip

{
  /* <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label
            htmlFor="cities"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select an option
          </label>
          <select
            id="cities"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="selectedCity"
          >
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="departureDate">From:</label>
          <input type="date" id="departureDate" name="departureDate" />
          <label htmlFor="returnDate">To:</label>
          <input type="date" id="returnDate" name="returnDate" />
          <div>
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Start planning
            </button>
          </div>
        </div>
      </form>
    </div> */
}
