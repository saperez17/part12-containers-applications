import { render, fireEvent } from '@testing-library/react';
import Todo from '../Todo';

describe('[Todo Component]', () => {

    it('Should render not done todo correctly', () => {
        const onDeleteFn = jest.fn();
        const onClickCompleteFn = jest.fn();
        const todo = {
            text: 'Testing todo text',
            done: false
        }
        const { getByText } = render(<Todo todo={todo} onClickDelete={onDeleteFn} onClickComplete={onClickCompleteFn} />)

        expect(getByText(/Testing todo text/)).toBeInTheDocument();
        expect(getByText(/This todo is not done/)).toBeInTheDocument();
        const deleteBtn = getByText(/Delete/);
        expect(deleteBtn).toBeDefined();
        fireEvent.click(deleteBtn);
        expect(onDeleteFn).toHaveBeenCalledTimes(1)
    })
})