'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Notify } from './notify';

interface Grafico {
  name: string,
  Atual: number,
  Previsto: number
}

export function MyBarChart() {
  const [data, setDados] = useState<Grafico[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/infos`)
      .then(res => res.json())
      .then(data => {
        const userId = data.idLoja;
        return fetch(`/api/pegarGrafico?id=${userId}`);
      })
      .then(res => res.json())
      .then(data => {
        const graficoArray = Object.values(data) as Grafico[]; 
        setDados(graficoArray);
        setLoading(false);
      })
      .catch(() => Notify("Não foi encontrado os dados! Recarregue a Página"));
  }, []);

  return (
    <div className="flex absolute top-5 justify-center items-center w-full h-full">
      {loading ? (
        <h1 className="text-center text-[1.5vw] text-gray-500">Carregando gráfico...</h1>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Atual" fill="#1D4ED8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Previsto" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
