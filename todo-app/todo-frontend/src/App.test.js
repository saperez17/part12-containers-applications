import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('../src/util/apiClient');

describe('[App]', () => {


  it('renders learn react link', async () => {
    // axios.get.mockResolvedValue({
    //   data: [
    //     {
    //       text: 'Write code',
    //       done: false,
    //       id: '61e664f32e5afa21b5e0f866'
    //     }
    //   ]
    // });

    render(<App />);
    const linkElement = await screen.findByText(/Write code/);
    expect(linkElement).toBeInTheDocument();
  });


})
