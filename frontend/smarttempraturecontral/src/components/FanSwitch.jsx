import React from 'react';
import { Fan } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const FanSwitch = () => {
  const queryClient = useQueryClient();
  const url = 'http://127.0.0.1:8000/api/fan-control/';

  // 1. Fetch the current state from the backend
  const { data } = useQuery({
    queryKey: ['fanState'],
    queryFn: () => fetch(url).then(res => res.json()),
    refetchInterval: 5000 // Poll every 3 seconds
  });

  const isOn = data?.is_on || false;

  // 2. Mutation to toggle the state
  const mutation = useMutation({
    mutationFn: (newState) => 
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_on: newState }),
      }),
    onSuccess: () => queryClient.invalidateQueries(['fanState'])
  });

  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-white rounded-3xl shadow-sm border border-gray-100">
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Cooling Control</h3>
      
      <div className={`transition-all duration-500 ${isOn ? 'text-blue-600' : 'text-gray-400'}`}>
        <Fan size={64} className={isOn ? 'animate-spin' : ''} />
      </div>

      <button
        onClick={() => mutation.mutate(!isOn)}
        className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
          isOn ? 'bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.6)]' : 'bg-gray-300'
        }`}
      >
        <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${isOn ? 'translate-x-8' : 'translate-x-0'}`} />
      </button>
      
      <span className="text-sm font-bold text-gray-800">
        {isOn ? 'FAN ACTIVE' : 'FAN OFF'}
      </span>
    </div>
  );
};

export default FanSwitch;