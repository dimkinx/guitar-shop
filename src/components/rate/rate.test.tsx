import {render, screen} from '@testing-library/react';
import {datatype, lorem} from 'faker';
import Rate from './rate';

const mockClassName = lorem.word();
const mockWidth = datatype.number(15).toString();
const mockHeight = datatype.number(15).toString();
const mockRating = datatype.number({min: 1, max: 5});

describe('Component: Rate', () => {
  it('should render correctly', () => {
    render(
      <Rate
        className={mockClassName}
        width={mockWidth}
        height={mockHeight}
        rating={mockRating}
      />);

    expect(screen.getByText(/Рейтинг/i)).toBeInTheDocument();
  });

  it('should render correctly with rating equal mockRating', () => {
    render(
      <Rate
        className={mockClassName}
        width={mockWidth}
        height={mockHeight}
        rating={mockRating}
      />);

    expect(screen.queryAllByTestId(/star/i)).toHaveLength(mockRating);
  });
});
