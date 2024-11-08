'use client';

import { Card, Typography } from '@material-tailwind/react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '70%',
  height: '400px'
};

const center = {
  lat: 37.437041393899676,
  lng: -4.191635586788259
};

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const TABLE_HEAD = ["Attempt", "Distance"];

const TABLE_ROWS = [
  {
    attempt: "1",
    distance: "100m",
  },
  {
    attempt: "2",
    distance: "52m",
  },
  {
    attempt: "3",
    distance: "7m",
  },
];


export default function Home() {
  return (
    <div className="flex flex-col items-center p-8 min-h-screen bg-gradient-to-r from-slate-900 to-slate-700">
      <h1 className="text-5xl font-semibold text-center">UTSCdle</h1>
      <div className="flex items-start space-x-8 p-8 align-middle">
        <img
          className="h-96 w-100 object-cover object-center"
          src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
          alt="nature image"
        />
        <Card className="h-full w-100 overflow-auto">
          <table className="w-100 min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography color="blue-gray" className="font-normal leading-none opacity-70">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(({ attempt, distance }, index) => (
                <tr key={attempt} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <Typography color="white">
                      {attempt}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography color="blue-gray" className="font-normal">
                      {distance}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
      <LoadScript googleMapsApiKey={googleMapsApiKey as string}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
