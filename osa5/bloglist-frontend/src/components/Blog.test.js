import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders blog title', () => {
  const blog = {
    title: 'This is a test blog title'
  }

  render(<Blog blog={blog} />)

  screen.debug()
  const element = screen.getByText('This is a test blog title')

  expect(element).toBeDefined()
})

test('renders likes, url and user after pressing \'view\'', async () => {

  const blog = {
    title: 'testtitle',
    author: 'testauthor',
    url: 'https://learnjavascript.com',
    likes: 20,
    user: {
      id: '12ds23e2',
      name: 'Jaakko',
      username: 'jaakkomae'
    }
  }

  const element = render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(element.container).toHaveTextContent('testtitle testauthorhidehttps://learnjavascript.comlikes 20likeJaakkoremove')
})

test('ensures that event handler is called twice when blog is liked twice', async () => {

  const blog = {
    title: 'testtitle',
    author: 'testauthor',
    url: 'https://learnjavascript.com',
    likes: 0,
    user: {
      id: '12ds23e2',
      name: 'Jaakko',
      username: 'jaakkomae'
    }
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} likeBlog={mockHandler} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('calls')