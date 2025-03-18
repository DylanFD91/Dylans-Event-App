import { useEffect, useState } from "react";
import { Tab, Grid, Header, Button, Card, Image } from "semantic-ui-react";
import { Profile } from "../../app/types/profile";
import { auth } from "../../app/config/firebase";
import PhotoUpload from "./PhotoUpload";
import { useAppSelector } from "../../app/store/store";
import { useFireStore } from "../../app/hooks/firestore/useFirestore";
import { actions } from "./photosSlice";

type Props = {
    profile: Profile
}

export default function ProfilePhotos({profile}: Props) {
    const [editMode, setEditMode] = useState(false);
    const isCurrentUser = auth.currentUser?.uid === profile.id;
    const {data: photos, status} = useAppSelector(state => state.photos);
    const {loadCollection} = useFireStore(`profiles/${profile.id}/photos`);

    useEffect(() => {
        loadCollection(actions)
    }, [loadCollection])

    return (
        <Tab.Pane loading={status === 'loading'}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='photo' content='Photos' />
                    {isCurrentUser &&
                    <Button 
                        floated='right'
                        basic
                        content={editMode ? 'Cancel' : 'Add photo'}
                        onClick={() => setEditMode(!editMode)}
                    />}
                </Grid.Column>
                <Grid.Column width={16}>
                    {editMode ? <PhotoUpload profile={profile} setEditMode={setEditMode}/> : (
                        <Card.Group itemsPerRow={5}>
                            {photos.map(photo => (
                                <Card key={photo.id}>
                                    <Image src={photo.url}/>
                                    {isCurrentUser &&
                                    <Button.Group>
                                        <Button basic color='green'>Main</Button>
                                        <Button basic color='red' icon='trash' />
                                    </Button.Group>}
                                </Card>
                            ))}
                        </Card.Group>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
}
