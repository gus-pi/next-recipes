'use client';

import { useEffect, useState } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import { Meal } from '@/types/Meal';
import Card from './components/Card';

export default function Home() {
  const [recipes, setRecipes] = useState<Meal[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchRecipes = async () => {
      try {
        const res = await fetch(
          'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood'
        );

        if (!res.ok) {
          throw new Error('Something went wrong');
        }
        const data = await res.json();
        setRecipes(data.meals);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <Header />;
      <Search />
      <div className="flex items-center justify-center p-10">
        <div className="flex flex-wrap flex-col lg:flex-row items-center gap-5">
          {recipes?.map((recipe) => (
            <Card recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
}
