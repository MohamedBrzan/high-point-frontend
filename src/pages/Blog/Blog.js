import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTranslation } from 'react-i18next';
import {
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
} from '../../store/apis/Blog/Blog';
import CustomSpinner from '../../utils/CustomSpinner/CustomSpinner';
import './Blog.css';
import logo from '../../images/logo.png';
import EditBlogForm from './helpers/EditBlogForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import CreateBlogForm from './helpers/CreateBlogForm';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../../store/reducers/Blog/BlogSlice';
import { useDispatch, useSelector } from 'react-redux';
import RemoveItem from '../../functions/RemoveItem';
import PageTitle from '../../utils/PageTitle';

const Blog = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.user);
  const isAdmin = user && user.isAdmin && user.isAdmin === true;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: blogs, isLoading, isSuccess, refetch } = useGetAllBlogsQuery();

  const [deleteBlog, { isLoading: deleting }] = useDeleteBlogMutation();

  if (isLoading || deleting) return <CustomSpinner />;

  return (
    <section className='blog'>
      {' '}
      <PageTitle>Blog</PageTitle>
      {isAdmin ? <CreateBlogForm refetch={refetch} /> : null}
      <div className='title'>{t('hpt_page.blogs_page.title')}</div>
      <Row>
        {blogs &&
          blogs.map((blog, index) => (
            <Col md={4} lg={3} key={index} className='card_col mb-3'>
              <Card>
                {' '}
                <div
                  className='delete_btn'
                  onClick={() =>
                    RemoveItem('blog', deleteBlog, blog._id, refetch)
                  }
                  title={t('hpt_page.card.title', {
                    en: `Delete ${blog.title}`,
                    ar: `حذف ${blog.title_ar}`,
                  })}
                >
                  <FontAwesomeIcon icon={faTrash} size='1x' />
                </div>
                {isAdmin ? (
                  <EditBlogForm blogData={blog} refetch={refetch} />
                ) : null}
                <Card.Img src={blog.card_image} />
                <Card.Body
                  onClick={() => {
                    dispatch(createBlog(blog));
                    navigate(`/blogs/${index}`);
                  }}
                >
                  <Card.Title>
                    {t('hpt_page.blogs_page.blog.title', {
                      en: blog.title,
                      ar: blog.title_ar,
                    })}
                  </Card.Title>
                </Card.Body>{' '}
                <div className='info_data'>
                  <div md={6}>
                    <img src={logo} alt='LOGO' />
                  </div>
                  <div md={6}>{new Date().toDateString()}</div>
                </div>
              </Card>
            </Col>
          ))}
      </Row>
    </section>
  );
};

export default Blog;
