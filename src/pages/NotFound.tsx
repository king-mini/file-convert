import { Link } from 'react-router-dom';

import Layout from '../components/Layout';

const NotFound = () => {

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-100 mb-4">404</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                    Page Not Found
                </p>
                <Link
                    to="/"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Go Home
                </Link>
            </div>
        </Layout>
    );
};

export default NotFound;
