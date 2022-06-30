import { useState, useEffect, useContext } from 'react';
import { useNavigate} from 'react-router';
import { useMutation, useQuery } from 'react-query';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import { API } from '../config/api';
import { UserContext } from '../context/userContext';

export default function EditProfile() {
  const title = 'Edit Profile';
  document.title = 'DumbMerch | ' + title;

  let navigate = useNavigate();
  const [state] = useContext(UserContext);

  const [preview, setPreview] = useState(null); //For image preview
  const [profile, setProfile] = useState({}); //Store product data
  const [form, setForm] = useState({
    image: '',
    phone: '',
    gender: '',
    address: '',
  }); //Store product data


  // Fetching detail product data by id from database
    let { data: profiles, refetch} = useQuery('profileCache', async () => {
    const response = await API.get(`/profile/` + state.user.id);
    console.log(response.data)
    return response.data;
    });


    useEffect(() => {
        if(profiles) {
            setPreview(profiles.image);
            setForm({
                ...form,
                phone: profiles.phone,
                gender: profiles.gender,
                address: profiles.address,
            });
            setProfile(profiles);
        }
    }, [profiles]);

  // Handle change data on form
  const handleChange = (e) => {
    setForm({ 
      ...form,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set('image', form.image[0], form.image[0].name);
      formData.set('phone', form.phone);
      formData.set('gender', form.gender);
      formData.set('address', form.address);

      // Insert profile data
      const response = await API.patch(
        `/profile/` + state.user.id,
        formData,
        config
      );
      console.log(response.data);
      console.log(form);

      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  });

//   
  
  return (
    <>
      <Navbar title={title} />
      <Container className="py-5">
        <Row>
          <Col xs="12">
            <div className="text-header-category mb-4">Edit Profile</div>
          </Col>
          <Col xs="12">
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
              {preview && (
                <div>
                  <img
                    src={preview}
                    style={{
                      maxWidth: '150px',
                      maxHeight: '150px',
                      objectFit: 'cover',
                    }}
                    alt= {preview}
                  />
                </div>
              )}
              <input
                type="file"
                id="upload"
                name="image"
                hidden
                onChange={handleChange}
              />
              <label for="upload" className="label-file-add-product">
                Upload file
              </label>
              <input
                type="number"
                placeholder="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="input-edit-category mt-4"
              />
              <input
                type="text"
                placeholder="Gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="input-edit-category mt-4"
              />
              <textarea
                placeholder="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="input-edit-category mt-4"
                style={{ height: '130px' }}
              ></textarea>

              <div className="d-grid gap-2 mt-4">
                <Button type="submit" variant="success" size="md">
                  Save
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
