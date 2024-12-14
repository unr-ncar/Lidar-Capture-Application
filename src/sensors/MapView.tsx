import { MapContainer, TileLayer } from "react-leaflet";
import SensorSelection from "../components/SensorSelection.tsx";
import useLidarMetadata, {
  ILidarMetadata,
  ILidarMetadataItem,
} from "../hooks/backend/metadataService/useLidarMetadata";
import { useEffect, useState } from "react";
import FrostedPagination from "../components/FrostedPagination.tsx";
import Loader from "../components/Loader.tsx";
import FormatSelector from "../components/FormatSelector.tsx";

export default function MapView() {
  const formatOptions = ["ros", "pcap"];
  const [page, setPage] = useState<number>(1);
  const [format, setFormat] = useState<string>("ros");
  const { isPending, data, error } = useLidarMetadata(page, 10);

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  useEffect(() => {
    console.log(format);
  }, [format]);

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
      <div className="absolute bottom-0 left-0 p-4 bg-white/70 backdrop-blur w-full gap-3 flex flex-col lg:left-0 lg:top-0 lg:w-[3/4] lg:max-w-[350px]">
        <Loader isLoading={isPending}>
          <>
            <div>
              <FormatSelector
                formats={formatOptions}
                selectedFormat={format}
                setFormat={(format) => setFormat(format)}
              />
            </div>
            <div className="inline-flex flex-row overflow-x-auto gap-4 max-w-full lg:grow lg:flex-col">
              {data?.items.map((sensor: ILidarMetadataItem) => (
                <SensorSelection key={sensor.lidar_id} sensor={sensor} />
              ))}
            </div>
            <FrostedPagination
              setPage={(pageNumber) => setPage(pageNumber)}
              currentPage={page}
              selectionWindowSize={3}
              pageSize={data?.size || 0}
              totalPageCount={data?.pages || 0}
              totalItemCount={data?.total || 0}
            />
          </>
        </Loader>
      </div>
    </div>
  );
}
