import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Card } from '../components/ui/Card';

const posts = [
  {
    author: 'Олена М.',
    text: 'Щойно повернулася з Карпат. Маршрут на Синевир просто неймовірний!',
    likes: 24,
  },
  {
    author: 'Андрій К.',
    text: 'Планую літню подорож Європою. Які міста обовʼязково варто відвідати?',
    likes: 18,
  },
  {
    author: 'Марія П.',
    text: 'Знайшла чудовий тур до Львова. Ділюся враженнями з усіма мандрівниками.',
    likes: 37,
  },
];

export function CommunityPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
      <h1 className="text-4xl font-black">Спільнота мандрівників</h1>
      <p className="mt-2 text-slate-600">Ділися досвідом, маршрутами та рекомендаціями.</p>

      <div className="mt-8 space-y-5">
        {posts.map((post) => (
          <Card key={post.author} className="p-6">
            <div className="font-bold">{post.author}</div>
            <p className="mt-3 leading-7 text-slate-700">{post.text}</p>
            <div className="mt-5 flex gap-6 text-sm text-slate-500">
              <button className="flex items-center gap-2 hover:text-red-500">
                <Heart size={18} /> {post.likes}
              </button>
              <button className="flex items-center gap-2 hover:text-blue-500">
                <MessageCircle size={18} /> Коментувати
              </button>
              <button className="flex items-center gap-2 hover:text-blue-500">
                <Share2 size={18} /> Поділитися
              </button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
