import React from 'react';
import HomePage from "../pages/HomePage";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReservationPage from "../pages/ReservationPage";
import PaymentPage from '../pages/PaymentPage';
import AccountPage, {
  action as deleteUserAction,
  loader as userLoader,
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
      path: '/Car-rental-web-app',
      element: <RootLayout />,
      id: 'root',
      loader: tokenLoader,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: '/Car-rental-web-app/sign',
          element: <SignPage />,
          action: signAction,
        },
        {
          path: '/Car-rental-web-app/login',
          element: <LoginPage />,
          action: loginAction,
        },
        {
          path: '/Car-rental-web-app/reservation',
          element: <ReservationPage />,
        },
        {
          path: '/Car-rental-web-app/payment',
          element: <PaymentPage />,
        },
        {
          path: '/Car-rental-web-app/account/:userID',
          id: 'user-details',
          loader: userLoader,
          children: [
            {
              index: true,
              element: <AccountPage />,
              action: deleteUserAction,
            },
            {
              path: '/Car-rental-web-app/account/:userID/reservationsHistory',
              element: <ResHistoryPage />,
              action: deleteReservationAction,
            },
            {
              path: '/Car-rental-web-app/account/:userID/loyalityCard',
              element: <LoyalityCardPage />,
            },
            {
              path: '/Car-rental-web-app/account/:userID/changePersInfo',
              element: <ChangePersInfoPage />,
              action: changePersInfo,
            },
          ],
        },
        {
          path: '/Car-rental-web-app/logout',
          action: logoutAction,
        },
        {
          path: '/Car-rental-web-app/damages',
          element: <DamagesPage />,
        },
        {
          path: '/Car-rental-web-app/thankYou',
          element: <ThankYouPage />,
        },
        {
          path: '/Car-rental-web-app/aboutUs',
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