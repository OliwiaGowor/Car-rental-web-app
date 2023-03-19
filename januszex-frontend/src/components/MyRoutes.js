import React from 'react';
import HomePage from "../pages/HomePage";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReservationPage from "../pages/ReservationPage";
import PaymentPage from '../pages/PaymentPage';
import AccountPage, {
  action as deleteUserAction,
} from "../pages/AccountPage"
import RootLayout from '../pages/Root';
import SignPage, { action as signAction } from '../pages/SignPage';
import LoginPage, { action as loginAction } from '../pages/LoginPage';
import { action as logoutAction } from '../pages/LogoutPage';
import { tokenLoader } from '../util/auth.js';
import ResHistoryPage, { action as deleteReservationAction } from '../pages/ResHistoryPage';
import DamagesPage from '../pages/DamagesPage';
import LoyalityCardPage from '../pages/LoyalityCardPage';
import ThankYouPage from '../pages/ThankYouPage';
import AboutUsPage from '../pages/AboutUsPage';
import ChangePersInfoPage, { action as changePersInfo } from '../pages/ChangePersInfoPage';

function MyRoutes() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      id: 'root',
      loader: tokenLoader,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: '/sign',
          element: <SignPage />,
          action: signAction,
        },
        {
          path: '/login',
          element: <LoginPage />,
          action: loginAction,
        },
        {
          path: '/reservation',
          element: <ReservationPage />,
        },
        {
          path: '/payment',
          element: <PaymentPage />,
        },
        {
          path: '/account',
          children: [
            {
              index: true,
              element: <AccountPage />,
              action: deleteUserAction,
            },
            {
              path: '/account/reservationsHistory',
              element: <ResHistoryPage />,
              action: deleteReservationAction,
            },
            {
              path: '/account/loyalityCard',
              element: <LoyalityCardPage />,
            },
            {
              path: '/account/changePersInfo',
              element: <ChangePersInfoPage />,
              action: changePersInfo,
            },
          ],
        },
        {
          path: '/logout',
          action: logoutAction,
        },
        {
          path: '/damages',
          element: <DamagesPage />,
        },
        {
          path: '/thankYou',
          element: <ThankYouPage />,
        },
        {
          path: '/aboutUs',
          element: <AboutUsPage />,
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default MyRoutes;