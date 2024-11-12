import { useEffect, useState } from 'react';
import { getAllBundles } from '../../../services/bundle/BundleService';
import { BundleListDto } from '../../../services/bundle/BundleListDto';
import '../AdminPanel.css';
import { Link } from 'react-router-dom';

const AdminBundle = () => {
    const [bundles, setBundles] = useState<BundleListDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBundles = async () => {
            try {
                const bundleList = await getAllBundles();
                setBundles(bundleList);
                setLoading(false);
            } catch (err) {
                setError('Failed to load authors');
                setLoading(false);
            }
        };

        fetchBundles();
    }, []);

    return (
        <div className="admin-panel-container">
            <div className="admin-nav row">
                <Link to="/admin"><h3>Manage Content / </h3></Link>
                <Link to="/admin/bundle"><h3>Bundles / </h3></Link>
            </div>
            <div className="admin-panel col">
                <div className="ap-top row">
                    <h1 className="ap-h1">Manage Bundles</h1>
                </div>
                {loading ? (
                    <p>Loading authors...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <table className="ap-table">
                        <thead>
                            <tr className="ap-thr">
                                <th className="apt-col-num">#</th>
                                <th className="apt-col-id">Id</th>
                                <th className="apt-col-name">Name</th>
                                <th className="apt-col-action">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bundles.map((bundle, index) => (
                                <tr key={bundle.id} className="ap-tr">
                                    <td className="apt-col-num">{index + 1}.</td>
                                    <td className="apt-col-id">{bundle.id}</td>
                                    <td className="apt-col-name">{bundle.name}</td>
                                    <td className="apt-col-action row">
                                        <Link to={`/admin/bundle/edit/${bundle.id}`}>
                                            <div className="ap-btn-list-edit">
                                                <p>Edit</p>
                                            </div>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="ap-btn-back-container row">
                    <Link to="/admin">
                        <div className="ap-btn-back">
                            <p>Back</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AdminBundle;