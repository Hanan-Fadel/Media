import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import AlbumListItem from "./AlbumListItem";


function AlbumsList({user}) {
    const {data, error, isFetching} = useFetchAlbumsQuery(user); //here better to use isFetching instead of isLoading

    const [addAlbum, results] = useAddAlbumMutation();

    const handleAddAlbum = ()=>{
        addAlbum(user);
    };

    let content;
    if (isFetching) { //instead of isLoading
        content = <Skeleton className="h-10 w-full" times={3}/>;
    } else if (error) {
        content = <div>Error loading albums.</div>;
    } else {
        content = data.map(album=>{
            return <AlbumListItem key={album.id} album={album} />
        });
    }

    return (
        <div>
            <div className="m-2 flex flex-row items-center justify-between">
                <h3 className="text-lg font-bold">Albums for {user.name}</h3>
                <Button onClick={handleAddAlbum} loading={results.isLoading}>
                    + Add Album
                </Button>
            </div>
            <div>
                {content}
            </div>
        </div>
    )
}

export default AlbumsList;