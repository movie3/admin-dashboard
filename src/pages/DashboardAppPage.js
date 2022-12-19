import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { getUsers } from '../Store/usersReducer';
import { getAllPosts , getPendingPosts , getApprovedPosts } from '../Store/postsReducer';
import { getAllComments } from '../Store/commentReducer';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppNewsUpdate,
  AppOrderTimeline,
  AppWidgetSummary,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getUsers());
    dispatch(getAllPosts());
    dispatch(getPendingPosts());
    dispatch(getApprovedPosts());
    dispatch(getAllComments());
  },[dispatch])



  const users = useSelector((state) => state.users.users);
  const posts = useSelector((state) => state.posts.allPosts);
  const pendingPosts = useSelector((state) => state.posts.pendingPosts);
  const approvedPosts = useSelector((state) => state.posts.approvedPosts);
  const comments= useSelector((state) => state.comments.allComments);
  // console.log(state);

  if(users.length===0) {
    return(
      <h1>Loading ...</h1>
    )
  }

  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Users" total={users.length} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Pending Posts" total={pendingPosts.length} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Approved Posts" total={approvedPosts.length} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Comments" total={comments.length} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
