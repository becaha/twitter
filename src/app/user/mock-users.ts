import {User} from './User';
import {Attachment} from '../status/attachment/Attachment';

export const MOCK_USERS: User[] = [
  new User('j', 'j', 'jacob', [], [], new Attachment('', 'image')),

  new User('k', 'k', 'kenny', [], [], new Attachment('', 'image')),

  new User('b', 'b', 'bailey', [], [], new Attachment('../../assets/images/couple.jpg', 'image')),
  new User('c', 'c', 'claire', [], [], new Attachment('../../assets/images/redHat.jpg', 'image')),
  new User('d', 'd', 'derek', [], [], new Attachment('../../assets/images/couple.jpg', 'image')),
  new User('e', 'e', 'ethan', [], [], new Attachment('../../assets/images/tongue.jpg', 'image')),

  new User('f', 'f', 'fred', [], [], new Attachment('../../assets/images/tongue.jpg', 'image')),
  new User('g', 'g', 'greg', [], [], new Attachment('../../assets/images/tongue.jpg', 'image')),
  new User('h', 'h', 'heidi', [], [], new Attachment('../../assets/images/tongue.jpg', 'image')),
  new User('i', 'i', 'isabel', [], [], new Attachment('../../assets/images/redHat.jpg', 'image')),

  new User('a', 'a', 'Becca', [], [], new Attachment('../../assets/images/tongue.jpg', 'image'))
];
