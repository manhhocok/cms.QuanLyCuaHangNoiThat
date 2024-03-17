import { BiCategoryAlt } from 'react-icons/bi';
import { FaProductHunt, FaUserAlt } from 'react-icons/fa';
import { IoAdd } from 'react-icons/io5';
import { MdOutlineTypeSpecimen } from 'react-icons/md';

export const menudata = [
  {
    title: 'User',
    button: [
      {
        icon: FaUserAlt,
        content: 'Danh sách người dùng',
        link: '/user',
      },
    ],
  },

  {
    title: 'Product',
    button: [
      {
        icon: FaProductHunt,
        content: 'Danh sách sản phẩm',
        link: '/product',
      },
      {
        icon: IoAdd,
        content: 'Thêm sản phẩm mới',
        link: '/new-product',
      },
    ],
  },

  {
    title: 'Category',
    button: [
      {
        icon: BiCategoryAlt,
        content: 'Danh sách category',
        link: '/category',
      },
    ],
  },

  {
    title: 'ProductType',
    button: [
      {
        icon: MdOutlineTypeSpecimen,
        content: 'Danh sách product type',
        link: '/product-type',
      },
    ],
  },

  {
    title: 'Material',
    button: [
      {
        icon: MdOutlineTypeSpecimen,
        content: 'Danh sách chất liệu',
        link: '/material',
      },
    ],
  },
  {
    title: 'Booking',
    button: [
      {
        icon: MdOutlineTypeSpecimen,
        content: 'Danh sách Booking',
        link: '/booking',
      },
    ],
  },
];
