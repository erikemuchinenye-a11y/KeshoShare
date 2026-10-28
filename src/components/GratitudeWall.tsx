import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, MessageSquareQuote, Plus, Sparkles, MapPin } from 'lucide-react';

export const GratitudeWall: React.FC = () => {
  const { gratitudeStories, toggleLikeGratitude, setIsGratitudeModalOpen } = useApp();

  return (
    <section className="py-8 bg-stone-50 min-h-[500px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-900 to-stone-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-semibold text-emerald-300 tracking-wider uppercase">
              THE KESHOSHARE SPIRIT
            </div>
            <h2 className="text-3xl font-extrabold font-display tracking-tight">
              Stories of Community Gratitude
            </h2>
            <p className="text-sm text-stone-200 leading-relaxed">
              When we share freely, we build trust, lighten financial burdens, and inspire tomorrow. Here is how gifts from neighbors have touched homes and schools across Nigeria.
            </p>
          </div>

          <button
            onClick={() => setIsGratitudeModalOpen(true)}
            className="px-5 py-3 text-sm font-semibold text-emerald-950 bg-white hover:bg-stone-100 rounded-xl transition-all flex items-center gap-2 shrink-0 self-start md:self-center shadow-xs"
          >
            <MessageSquareQuote className="w-4 h-4 text-emerald-800" />
            <span>Say Thank You</span>
          </button>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gratitudeStories.map(story => (
            <div
              key={story.id}
              className="bg-white rounded-xl border border-stone-200/90 overflow-hidden flex flex-col justify-between hover:border-emerald-700/60 transition-all shadow-2xs"
            >
              <div>
                {/* Photo if present */}
                {story.imageUrl && (
                  <div className="relative aspect-16/9 w-full bg-stone-100 overflow-hidden">
                    <img
                      src={story.imageUrl}
                      alt={`Gratitude for ${story.itemTitle}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-stone-950/70 backdrop-blur-xs text-white text-xs px-2 py-0.5 rounded">
                      Gifted: {story.itemTitle}
                    </div>
                  </div>
                )}

                <div className="p-5 space-y-3">
                  {/* Item and Giver link */}
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span>Thanking <strong className="text-stone-800">{story.giverName}</strong></span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        {story.location}
                      </span>
                    </div>
                    <span>{story.createdAt}</span>
                  </div>

                  {/* Gratitude text */}
                  <p className="text-sm text-stone-700 leading-relaxed italic">
                    "{story.message}"
                  </p>
                </div>
              </div>

              {/* Story Author & Like Action */}
              <div className="px-5 py-3.5 bg-stone-50/70 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={story.recipientAvatar}
                    alt={story.recipientName}
                    referrerPolicy="no-referrer"
                    className="w-6 h-6 rounded-full object-cover border border-stone-200"
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-stone-800">{story.recipientName}</span>
                    <span className="text-stone-400 ml-1.5">(Recipient)</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleLikeGratitude(story.id)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md transition-colors ${
                    story.likedByCurrentUser
                      ? 'text-rose-700 bg-rose-50'
                      : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${story.likedByCurrentUser ? 'fill-rose-600 text-rose-600' : ''}`} />
                  <span className="tabular-nums">{story.likesCount}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
