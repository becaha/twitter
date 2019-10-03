import {User} from './User';
import {Attachment} from '../status/attachment/Attachment';

export const MOCK_USERS: User[] = [
  new User('j', 'j', 'jacob', [], [], new Attachment('')),

  new User('k', 'k', 'kenny', [], [], new Attachment('')),

  new User('b', 'b', 'bailey', [], [], new Attachment('../../assets/images/couple.jpg')),
  new User('c', 'c', 'claire', [], [], new Attachment('../../assets/images/redHat.jpg')),
  new User('d', 'd', 'derek', [], [], new Attachment('../../assets/images/couple.jpg')),
  new User('e', 'e', 'ethan', [], [], new Attachment('../../assets/images/tongue.jpg')),

  new User('f', 'f', 'fred', [], [], new Attachment('../../assets/images/tongue.jpg')),
  new User('g', 'g', 'greg', [], [], new Attachment('../../assets/images/tongue.jpg')),
  new User('h', 'h', 'heidi', [], [], new Attachment('../../assets/images/tongue.jpg')),
  new User('i', 'i', 'isabel', [], [], new Attachment('../../assets/images/redHat.jpg')),

  new User('a', 'a', 'Becca', [], [], new Attachment('../../assets/images/tongue.jpg'))
];
