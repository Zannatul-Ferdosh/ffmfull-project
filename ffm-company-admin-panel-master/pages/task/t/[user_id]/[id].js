import { useRouter } from 'next/router';
import Layout from '../../../../components/Layout';
import fetch from 'isomorphic-unfetch';
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';
import "bootstrap/dist/css/bootstrap.css";
import TaskDetails from '../../../../components/Task/TaskDetails';

const Post = props => (
    <Layout>
        <TaskDetails task_data={props.task_data} userId={props.task_data.user_id}/>
    </Layout>
);

Post.getInitialProps = async function(context) {
    const { user_id, id } = context.query;
    const token = localStorage.getItem('token');

    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const res = await fetch(`/api/v1/field-force/task/get-task-details/${user_id}/${id}`, {headers: headers});
    const show = await res.json();
    const task_data = show.data[0];

    console.log(task_data);
    return { task_data };
};

export default Post;