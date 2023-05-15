import {CreateForm} from "./create-form";
import {ShowPosts} from "./show-post";
// This component is used as the main form for the page Create Post. 
// This makes it easier to expand the site in the future
export const CreatePost = () => {
    return (
        <div>
            <div>
                <CreateForm />
            </div>
            <div>
                <ShowPosts />
            </div>
        </div>
    );
};


// This code represents rules used in Firebase with collection colections
/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow write, update: if request.auth != null && request.auth.uid == request.resource.data.userId;
      allow read, delete: if request.auth != null;
    }
  }
}
*/