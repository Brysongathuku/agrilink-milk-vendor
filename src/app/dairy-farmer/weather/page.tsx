'use client';

import { Cloud, CloudRain, CloudSun, Droplet, Sun, Wind, type LucideIcon } from 'lucide-react';
import { PageHeader, SectionCard, StatCard, Stats } from '@/components/ui';
import { WEATHER } from '@/lib/dairy-data';

const ICONS: Record<string, LucideIcon> = { sun: Sun, cloudSun: CloudSun, cloud: Cloud, rain: CloudRain };

export default function WeatherPage() {
  const today = WEATHER[0];
  return (
    <div className="stack">
      <PageHeader title="Weather" subtitle="Githunguri, Kiambu County" boxed={false} />
      <Stats>
        <StatCard label="Now" value={`${today.high}°C`} foot={today.note} />
        <StatCard label="Humidity" value="62%" icon={<Droplet size={20} color="#4A9FD4" />} />
        <StatCard label="Wind" value="11 km/h" icon={<Wind size={20} color="#4A9FD4" />} />
        <StatCard label="Rain this week" value="38 mm" foot="Mostly Friday and Saturday" />
      </Stats>
      <SectionCard title="Next 7 days">
        <div className="weather-row">
          {WEATHER.map((d) => {
            const Icon = ICONS[d.icon] ?? Sun;
            return (
              <div className="weather-day" key={d.day}>
                <div className="weather-name">{d.day}</div>
                <Icon size={34} color={d.icon === 'rain' ? '#4A9FD4' : '#F0A030'} strokeWidth={1.6} />
                <div className="weather-temp">{d.high}° <span>{d.low}°</span></div>
                <div className="weather-rain">{d.rain}% rain</div>
              </div>
            );
          })}
        </div>
      </SectionCard>
      <SectionCard title="Farm advice">
        <div className="kv"><span>Cut and store Napier grass on Thursday before the rain.</span></div>
        <div className="kv"><span>Keep the zero-grazing floor dry over the weekend to avoid foot rot.</span></div>
        <div className="kv"><span>Cover milk cans on the way to the collection point on Friday and Saturday.</span></div>
      </SectionCard>
    </div>
  );
}
