import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { logIn } from "@redux/modules/auth/actions";

import Logo from "@components/Logo";
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback
} from "availity-reactstrap-validation";
import {
  Button,
  Card,
  CardBody,
  Label,
  UncontrolledAlert,
  Spinner
} from "reactstrap";

const SignIn = ({ dispatch, auth }) => {
  const loading = useSelector(state => state.auth.loading);
  const [state, setState] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = () => {
    dispatch(logIn(state));
  }

  return (
    <React.Fragment>
      <div className="text-center mt-4">
        <Logo className="site-brand site-brand_type_auth" />
        <p className="lead">Чтобы продолжить войдите в свой акканут</p>
      </div>
      <Card>
        <CardBody>
          <div className="m-sm-4">
            <AvForm onValidSubmit={handleSubmit} disabled={loading}>
              {auth.message && (
                <UncontrolledAlert color="danger">
                  <div className="alert-message">{auth.message}</div>
                </UncontrolledAlert>
              )}
              <AvGroup>
                <Label for="username">Логин</Label>
                <AvInput
                  id="username"
                  name="username"
                  placeholder="Введите свой логин"
                  bsSize="lg"
                  onChange={handleInputChange}
                  required
                />
                <AvFeedback>Это поле не может быть пустым</AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="password">Пароль</Label>
                <AvInput
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Введите свой пароль"
                  bsSize="lg"
                  onChange={handleInputChange}
                  required
                />
                <AvFeedback>Это поле не может быть пустым</AvFeedback>
              </AvGroup>
              <div className="text-center mt-3">
                <Button 
                  color="primary" 
                  size="lg"
                  disabled={loading}
                >
                  {loading && (
                    <Spinner
                      type="grow"
                      size="sm"
                      className="mr-2"
                    />
                  )}
                  Войти
                </Button>
              </div>
            </AvForm>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default connect(store => ({
  auth: store.auth
}))(SignIn);
