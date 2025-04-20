import Link from 'next/link';

const popularCities = [
  'New York',
  'london',
  'Paris',
  'Tokyo',
  'Sydney',
  'Berlin',
  'Toronto',
  'Dubai',
  'Singapore',
  'Rome',
];

export default function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Choose a City</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {popularCities.map((city) => (
          <li key={city}>
            <Link href={`/${encodeURIComponent(city).toLowerCase()}`}>{city}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
