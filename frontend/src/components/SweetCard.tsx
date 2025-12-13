import React, { useState } from 'react';
import { Sweet } from '../api/sweets';
import { useAuth } from '../context/AuthContext';
import './SweetCard.css';

interface SweetCardProps {
  sweet: Sweet;
  onEdit?: () => void;
  onDelete?: () => void;
  onPurchase: (id: number, quantity: number) => Promise<void>;
  onRestock?: (id: number, quantity: number) => Promise<void>;
}

const SweetCard: React.FC<SweetCardProps> = ({
  sweet,
  onEdit,
  onDelete,
  onPurchase,
  onRestock
}) => {
  const { isAdmin } = useAuth();
  const [purchaseQty, setPurchaseQty] = useState(1);
  const [restockQty, setRestockQty] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePurchase = async () => {
    setError('');
    setLoading(true);
    try {
      await onPurchase(sweet.id, purchaseQty);
      setPurchaseQty(1);
    } catch (err: any) {
      setError(err.message || 'Purchase failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRestock = async () => {
    if (!onRestock) return;
    setError('');
    setLoading(true);
    try {
      await onRestock(sweet.id, restockQty);
      setRestockQty(10);
    } catch (err: any) {
      setError(err.message || 'Restock failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sweet-card">
      {sweet.imageUrl && (
        <div className="sweet-image">
          <img src={sweet.imageUrl} alt={sweet.name} />
        </div>
      )}
      <div className="sweet-content">
        <div className="sweet-header">
          <h3>{sweet.name}</h3>
          <span className="sweet-category">{sweet.category}</span>
        </div>

        {sweet.description && <p className="sweet-description">{sweet.description}</p>}

        <div className="sweet-info">
          <span className="sweet-price">${parseFloat(sweet.price.toString()).toFixed(2)}</span>
          <span className={`sweet-stock ${sweet.quantity === 0 ? 'out-of-stock' : ''}`}>
            {sweet.quantity > 0 ? `${sweet.quantity} in stock` : 'Out of stock'}
          </span>
        </div>

        {error && <div className="sweet-error">{error}</div>}

        <div className="sweet-actions">
          {/* Purchase Section */}
          {sweet.quantity > 0 && (
            <div className="action-group">
              <input
                type="number"
                min="1"
                max={sweet.quantity}
                value={purchaseQty}
                onChange={(e) => setPurchaseQty(parseInt(e.target.value) || 1)}
                className="quantity-input"
              />
              <button
                onClick={handlePurchase}
                disabled={loading || sweet.quantity === 0}
                className="purchase-button"
              >
                Purchase
              </button>
            </div>
          )}

          {/* Admin Actions */}
          {isAdmin && (
            <>
              <div className="admin-actions">
                <button onClick={onEdit} className="edit-button">
                  Edit
                </button>
                <button onClick={onDelete} className="delete-button">
                  Delete
                </button>
              </div>

              {onRestock && (
                <div className="action-group">
                  <input
                    type="number"
                    min="1"
                    value={restockQty}
                    onChange={(e) => setRestockQty(parseInt(e.target.value) || 10)}
                    className="quantity-input"
                  />
                  <button onClick={handleRestock} disabled={loading} className="restock-button">
                    Restock
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SweetCard;
