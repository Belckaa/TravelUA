import { useState } from 'react';
import { CalendarDays, Star, Users } from 'lucide-react';
import type { Hotel, Room } from '../../data/hotels';
import { addBooking } from '../../services/bookingCart';

interface HotelCardProps {
  hotel: Hotel;
}

export function HotelCard({ hotel }: HotelCardProps) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [guests, setGuests] = useState(2);
  const [nights, setNights] = useState(1);
  const [added, setAdded] = useState(false);

  function bookRoom() {
    if (!selectedRoom) return;

    addBooking({
      id: `hotel-${hotel.id}-${selectedRoom.id}`,
      type: 'hotel',
      title: hotel.name,
      subtitle: selectedRoom.name,
      price: selectedRoom.price,
      quantity: nights,
      guests,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <img
        src={hotel.image}
        alt={hotel.name}
        className="h-56 w-full object-cover"
      />

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              {hotel.name}
            </h3>
            <p className="mt-1 text-sm text-slate-500">{hotel.city}</p>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-bold text-amber-600">
            <Star size={15} fill="currentColor" />
            {hotel.rating}
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          {hotel.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {hotel.amenities.map((item) => (
            <span
              key={item}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">від</p>
            <p className="text-2xl font-black text-blue-600">
              {hotel.priceFrom.toLocaleString('uk-UA')} грн
            </p>
            <p className="text-xs text-slate-400">за ніч</p>
          </div>

          <button
            onClick={() =>
              setSelectedRoom(selectedRoom ? null : hotel.rooms[0])
            }
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            {selectedRoom ? 'Сховати номери' : 'Обрати номер'}
          </button>
        </div>

        {selectedRoom && (
          <div className="mt-6 border-t border-slate-200 pt-6">
            <h4 className="mb-3 font-extrabold text-slate-900">
              Доступні номери
            </h4>

            <div className="space-y-3">
              {hotel.rooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoom(room)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    selectedRoom.id === room.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-slate-900">{room.name}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        {room.description}
                      </p>
                    </div>

                    <p className="font-black text-blue-600">
                      {room.price.toLocaleString('uk-UA')} грн
                    </p>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {room.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs text-slate-500"
                      >
                        • {feature}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-600">
                <span className="mb-1 flex items-center gap-2">
                  <Users size={15} />
                  Гості
                </span>
                <input
                  id={`guests-${hotel.id}`}
                  name={`guests-${hotel.id}`}
                  type="number"
                  min="1"
                  max={selectedRoom.guests}
                  value={guests}
                  onChange={(event) => setGuests(Number(event.target.value))}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2"
                />
              </label>

              <label className="text-sm font-semibold text-slate-600">
                <span className="mb-1 flex items-center gap-2">
                  <CalendarDays size={15} />
                  Ночі
                </span>
                <input
                  id={`nights-${hotel.id}`}
                  name={`nights-${hotel.id}`}
                  type="number"
                  min="1"
                  max="30"
                  value={nights}
                  onChange={(event) => setNights(Number(event.target.value))}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2"
                />
              </label>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-2xl bg-slate-950 p-4 text-white">
              <div>
                <p className="text-xs text-slate-400">Разом</p>
                <p className="text-xl font-black">
                  {(selectedRoom.price * nights).toLocaleString('uk-UA')} грн
                </p>
              </div>

              <button
                onClick={bookRoom}
                className="rounded-xl bg-blue-500 px-5 py-3 font-bold hover:bg-blue-400"
              >
                {added ? '✓ Додано' : 'Додати до бронювання'}
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
