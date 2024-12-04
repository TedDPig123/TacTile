This is the Image import for object token feature. This feature lets the user chose wether they want to add image to their token. If they do they can update/delete the image on the token. Update image: can re-choose image, and will update image size with token size. If user delete the object token the image will also get deleted with it. All images are saved in IndexDB
```mermaid
sequenceDiagram
    participant user as User
    participant web as Web Browser
    participant img as Image
    participant db as IndexDB

    user->>web: user clicks add/update object button
    opt user clicks selects an image
        user->>web: selects file
        web->>img: calls PreviewImg()
        img->>web: returns the URL for the image to display in add/update Object Form
    end

    alt user clicks cancel
        user->>web: clicks cancel button
        web->>img: calls clearImage()
        img->>web: removes the URL for the image (image preview is now empty)
    else user clicks create
        user->>web: clicks create button
        web->>img: calls createImageElement()
        alt user selected an image
            img->>img: creats a new img element and add the new img.src
            img->>db: calls addObject() to async add the image imformaiton to IndexDB.
            db->>img: returns a promise
            img ->> web: create a token with that image on it on the battle grid
        else user didn't select an image
            img->>web: does nothing, returns nothing
            Note over user, db: create a token with default color on it on the battle grid
        end
    end

    opt user clicks token
        user ->> web: clicked an object token
        alt user click cancel
            Note over user,db: same thing happen, is the same cancel button
        else user clicked delete
            user ->> web: user click the delete button
            web ->> img: calls deleteImageElement()
            img ->> db:calls deleteObject() to async delete the image in IndexDB.
            db ->> img:returns a promise
            img ->> web: user delete the object token and its image
        else user clicks update
            user ->> web: clicked the update button
            alt user selected an image
                user ->> web: user clicked the Choose File button
                alt token already had an image
                    web->>img: calls updateImageElement()
                    img->>db: calls getObject() to async get the image for that object in IndexDB
                    db->>img: returns promise
                    img->>img: updates the src of the img element
                    img ->> db: calls updateObject() to async update the image in IndexDB with new src.
                    db ->> img:returns a promise
                    img ->> web: the token the user clicks on now have the updated image
                else token doesn't have an image
                    web->>img: calls updateImageElement()
                    img->>img: creats a new img element and add the new img.src
                    img ->> db: calls addObject() to async add the image imformaiton to IndexDB.
                    img ->> web:the token the user clicks on now have the updated image
                end
            else user didn't select an image
                alt token already had an image(image preview shows an image)
                    web->>img: calls updateImageElement()
                    img->>db: calls getObject() to async get the image of the object in IndexDB
                    db->>img: returns promise
                    img->>img: updates the src of the img element(in this case it is the same)
                    img ->> db: calls updateObject() to async update the image in IndexDB.
                    db ->> img:returns a promise
                    img ->> web: the token the user clicks on has the same image
                else token doesn't have an image(or image preview shows nothing)
                    alt token doesn't have an image
                        web->>img: calls updateImageElement()
                        img->>web: does nothing and returns nothing
                        Note over user, db: updates the token the user clicked, no change to the image of the token (still default color)
                    else image preview shows nothing
                        user ->> web: user clicked the Choose File button and click cancel 
                        web->>img: calls updateImageElement()
                        img ->> img: removes the img element under the object div
                        img ->> img: calls deleteImageElement()
                        img ->> db:calls deleteObject() to async delete the image in IndexDB.
                        db ->> img:returns a promise
                        img ->> web: user delete the object token and its image

                    end
                end
            end
        end
    end
```