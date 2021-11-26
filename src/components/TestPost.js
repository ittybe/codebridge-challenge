import { useParams } from "react-router-dom";

export default function TestPost() {
    let params = useParams();
    console.log(params.postId)
    return (
        <div>
            Test post: {params.postId}
        </div>
    )
}