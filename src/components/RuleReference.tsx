import React from 'react';
import { BookOpen, Users, Compass, Award, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface RuleReferenceProps {
  isSerbian: boolean;
}

export const RuleReference: React.FC<RuleReferenceProps> = ({ isSerbian }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="bg-stone-900 text-white rounded-3xl p-5 sm:p-7 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
          <BookOpen className="w-4 h-4" />
          <span>{isSerbian ? 'Zvanična pravila i vodič' : 'Official Rules & Quick Guide'}</span>
        </div>
        <h1 className="font-medieval text-2xl sm:text-3xl font-extrabold">
          {isSerbian ? 'Brzi vodič kroz pravila Keyflower-a' : 'Keyflower Rules Reference'}
        </h1>
        <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
          {isSerbian
            ? 'Pravila licitacije, proizvodnje, transporta, nadogradnje i bodovanja iz zvaničnog pravilnika.'
            : 'Rules for bidding, production, transport, upgrades, and game-end scoring from the official rulebook.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 1. Bidding Rules */}
        <div className="bg-stone-50 rounded-3xl p-5 border-2 border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-rose-800 font-medieval font-bold text-lg">
            <Users className="w-5 h-5" />
            <h3>{isSerbian ? '1. Licitacija za tajlove (Bidding)' : '1. Bidding for Tiles'}</h3>
          </div>
          <ul className="text-xs sm:text-sm text-stone-700 space-y-2 list-disc list-inside">
            <li>
              <strong>{isSerbian ? 'Pravilo iste boje:' : 'Same Colour Rule:'}</strong>{' '}
              {isSerbian
                ? 'Svi radnici koji se koriste za licitaciju ili aktivaciju istog tajla moraju biti iste boje (plavi, crveni ili žuti).'
                : 'All workers used in bidding for a tile or placed on the tile for production must be of the same colour.'}
            </li>
            <li>
              <strong>{isSerbian ? 'Veća ponuda:' : 'Higher Bid:'}</strong>{' '}
              {isSerbian
                ? 'Nova ponuda na drugoj ivici tajla mora imati strogo veći broj radnika nego prethodna vodeća ponuda.'
                : 'A new bid on another side of the tile must have strictly more workers than the previous leading bid.'}
            </li>
            <li>
              <strong>{isSerbian ? 'Premeštanje radnika:' : 'Outbid Workers:'}</strong>{' '}
              {isSerbian
                ? 'Ako ste nadlicitirani, vaši radnici se u vašem sledećem potezu mogu pomeriti na drugi tajl (zajedno kao grupa) ili pojačati novim radnicima iza vašeg paravana.'
                : 'If outbid, your workers may be moved together to another tile or reinforced with workers from behind your screen.'}
            </li>
          </ul>
        </div>

        {/* 2. Production Rules */}
        <div className="bg-stone-50 rounded-3xl p-5 border-2 border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-emerald-800 font-medieval font-bold text-lg">
            <Zap className="w-5 h-5" />
            <h3>{isSerbian ? '2. Proizvodnja (Production)' : '2. Production & Placement'}</h3>
          </div>
          <ul className="text-xs sm:text-sm text-stone-700 space-y-2 list-disc list-inside">
            <li>
              <strong>{isSerbian ? 'Pravilo 1-2-3 radnika:' : '1-2-3 Workers Scale:'}</strong>{' '}
              {isSerbian
                ? '1. korišćenje tajla u sezoni košta 1 radnika. 2. korišćenje košta 2 radnika. 3. korišćenje košta 3 radnika. Maksimalno 6 radnika na tajlu po sezoni!'
                : '1st use requires 1 worker. 2nd use requires 2 workers. 3rd use requires 3 workers. Maximum 6 workers per tile in a single season!'}
            </li>
            <li>
              <strong>{isSerbian ? 'Korišćenje tuđih sela:' : 'Visiting Other Villages:'}</strong>{' '}
              {isSerbian
                ? 'Možete postaviti radnike na zgrade u tuđim selima ili na pločice za koje se trenutno licitira. Resursi idu u vaš početni dom!'
                : 'You may place workers on tiles in other players villages or tiles being bid on. Generated resources are placed on your home tile!'}
            </li>
          </ul>
        </div>

        {/* 3. Transport & Upgrades */}
        <div className="bg-stone-50 rounded-3xl p-5 border-2 border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-800 font-medieval font-bold text-lg">
            <Compass className="w-5 h-5" />
            <h3>{isSerbian ? '3. Prevoz i Nadogradnje' : '3. Transport & Upgrades'}</h3>
          </div>
          <ul className="text-xs sm:text-sm text-stone-700 space-y-2 list-disc list-inside">
            <li>
              <strong>{isSerbian ? 'Kretanje po putevima:' : 'Road Movement:'}</strong>{' '}
              {isSerbian
                ? 'Resursi se moraju kretati isključivo duž spojenih puteva između susednih pločica.'
                : 'Resources must be transported along connected roads between adjacent tiles.'}
            </li>
            <li>
              <strong>{isSerbian ? 'Nadogradnja:' : 'Upgrading:'}</strong>{' '}
              {isSerbian
                ? 'Da bi se pločica nadogradila (okrenula), neophodni resursi moraju biti fizički na toj pločici u trenutku aktivacije transportnog tajla.'
                : 'To upgrade a tile, the required resources must be physically located on that tile when the transport action is triggered.'}
            </li>
          </ul>
        </div>

        {/* 4. Season End & Boats */}
        <div className="bg-stone-50 rounded-3xl p-5 border-2 border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-800 font-medieval font-bold text-lg">
            <Award className="w-5 h-5" />
            <h3>{isSerbian ? '4. Kraj sezone i Brodovi' : '4. Season End & Boats'}</h3>
          </div>
          <ul className="text-xs sm:text-sm text-stone-700 space-y-2 list-disc list-inside">
            <li>
              <strong>{isSerbian ? 'Poraženi i uspešni radnici:' : 'Worker Resolution:'}</strong>{' '}
              {isSerbian
                ? 'Radnici sa neuspešnih ponuda vraćaju se iza vašeg paravana. Radnici sa uspešnih ponuda idu u vrećicu.'
                : 'Workers from losing bids return behind your screen. Workers from winning bids are returned to the cloth bag.'}
            </li>
            <li>
              <strong>{isSerbian ? 'Domaći radnici:' : 'Home Workers:'}</strong>{' '}
              {isSerbian
                ? 'Radnici postavljeni na pločice unutar vašeg sela (vaši ili protivnički) idu iza VAŠEG paravana za sledeću sezonu!'
                : 'All workers placed on tiles inside your village are retained behind YOUR screen for the next season!'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
