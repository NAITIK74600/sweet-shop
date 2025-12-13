import { Response } from 'express';
import { Sweet } from '../models';
import { validationResult } from 'express-validator';
import { AuthRequest } from '../middleware/auth';
import { Op } from 'sequelize';

export const createSweet = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, category, price, quantity, description, imageUrl } = req.body;

    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity,
      description,
      imageUrl
    });

    res.status(201).json(sweet);
  } catch (error: any) {
    console.error('Create sweet error:', error);
    res.status(500).json({ message: 'Server error while creating sweet' });
  }
};

export const getAllSweets = async (req: AuthRequest, res: Response) => {
  try {
    const sweets = await Sweet.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json(sweets);
  } catch (error: any) {
    console.error('Get sweets error:', error);
    res.status(500).json({ message: 'Server error while fetching sweets' });
  }
};

export const searchSweets = async (req: AuthRequest, res: Response) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    const whereClause: any = {};

    if (name) {
      whereClause.name = {
        [Op.iLike]: `%${name}%`
      };
    }

    if (category) {
      whereClause.category = {
        [Op.iLike]: `%${category}%`
      };
    }

    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) {
        whereClause.price[Op.gte] = parseFloat(minPrice as string);
      }
      if (maxPrice) {
        whereClause.price[Op.lte] = parseFloat(maxPrice as string);
      }
    }

    const sweets = await Sweet.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json(sweets);
  } catch (error: any) {
    console.error('Search sweets error:', error);
    res.status(500).json({ message: 'Server error while searching sweets' });
  }
};

export const updateSweet = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const sweet = await Sweet.findByPk(id);

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    const { name, category, price, quantity, description, imageUrl } = req.body;

    await sweet.update({
      ...(name && { name }),
      ...(category && { category }),
      ...(price !== undefined && { price }),
      ...(quantity !== undefined && { quantity }),
      ...(description !== undefined && { description }),
      ...(imageUrl !== undefined && { imageUrl })
    });

    res.status(200).json(sweet);
  } catch (error: any) {
    console.error('Update sweet error:', error);
    res.status(500).json({ message: 'Server error while updating sweet' });
  }
};

export const deleteSweet = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const sweet = await Sweet.findByPk(id);

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    await sweet.destroy();
    res.status(200).json({ message: 'Sweet deleted successfully' });
  } catch (error: any) {
    console.error('Delete sweet error:', error);
    res.status(500).json({ message: 'Server error while deleting sweet' });
  }
};

export const purchaseSweet = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity <= 0) {
      return res.status(400).json({ message: 'Purchase quantity must be greater than 0' });
    }

    const sweet = await Sweet.findByPk(id);

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    if (sweet.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient stock available' });
    }

    await sweet.update({
      quantity: sweet.quantity - quantity
    });

    res.status(200).json(sweet);
  } catch (error: any) {
    console.error('Purchase sweet error:', error);
    res.status(500).json({ message: 'Server error while purchasing sweet' });
  }
};

export const restockSweet = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity <= 0) {
      return res.status(400).json({ message: 'Restock quantity must be greater than 0' });
    }

    const sweet = await Sweet.findByPk(id);

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    await sweet.update({
      quantity: sweet.quantity + quantity
    });

    res.status(200).json(sweet);
  } catch (error: any) {
    console.error('Restock sweet error:', error);
    res.status(500).json({ message: 'Server error while restocking sweet' });
  }
};
