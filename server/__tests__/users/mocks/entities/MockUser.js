import jwt from 'jsonwebtoken';
import authConfig from '@/config/auth';
import MockBaseEntity from '@/tests/core/mocks/entities/MockBaseEntity'

class MockUser extends MockBaseEntity {
  constructor(data) {
    super(data);
    this.name = data.name;
    this.email = data.email;
    this.bio = data.bio;
    this.password = data.password;
  }

  generateToken() {
    const { id } = this;
    return jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });
  }

  checkPassword(password) {
    return this.password === password;
  }
}

export default MockUser;
