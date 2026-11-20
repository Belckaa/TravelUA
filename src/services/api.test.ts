import { describe, expect, it } from 'vitest';
import { tourService } from './api';

describe('tourService', () => {
  it('returns tours', async () => {
    const tours = await tourService.getTours();

    expect(tours.length).toBeGreaterThan(0);
    expect(tours[0]).toHaveProperty('title');
    expect(tours[0]).toHaveProperty('price');
  });

  it('finds tour by id', async () => {
    const tour = await tourService.getTour('1');

    expect(tour?.id).toBe('1');
  });
});
