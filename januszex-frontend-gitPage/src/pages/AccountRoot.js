import { Outlet } from 'react-router-dom';

function AccountRoot() {
  return (
    <div >
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AccountRoot;