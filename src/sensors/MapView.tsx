import { MapContainer, TileLayer } from "react-leaflet";
import MapSummary from "../components/MapSummary";
import useLidarMetadata, { ILidarMetadata, ILidarMetadataItem } from "../hooks/backend/metadataService/useLidarMetadata";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import FrostedPagination from "../components/FrostedPagination";

export default function MapView() {

  let [searchParams, setSearchParams] = useSearchParams({
    page: String(1),
    size: String(10)
  })
  const {isPending, data, error} = useLidarMetadata(Number(searchParams.get("page")), Number(searchParams.get("size")))

  const setPage = (page: number) => {
    setSearchParams({page: String(page)})
  }

  useEffect(() => {
    if (data) console.log(data)
  }, [data])

  return (
    <div className="relative flex flex-col w-full max-h-full h-full">
      <MapContainer
        className="z-0 w-full h-full"
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <div className="absolute bottom-0 left-0 p-4 bg-white/70 backdrop-blur w-full gap-2 flex flex-col">
      <div className="flex justify-between">
      <p className="uppercase font-semibold text-xs text-neutral-400">
          Page {data?.page} of {data?.pages}
        </p>
        <FrostedPagination setValue={(pageNumber) => setPage(pageNumber)} value={Number(searchParams)} windowSize={3} totalItems={data?.size || 0} />
      </div>
        <div className="inline-flex flex-row overflow-x-auto gap-4 max-w-full">
          {data?.items.map((sensor: ILidarMetadataItem) => (
            <MapSummary key={sensor.lidar_id} sensor={sensor} />
          ))}
        </div>
      </div>
    </div>
  );
}
