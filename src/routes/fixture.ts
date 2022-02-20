import { Router } from 'express'
import FixtureController from '../controllers/fixture.controller'
import {FixtureDto, UpdateFixtureDto } from '../dto/fixture.dto';
import validationMiddleware from '../middleware/validation.middleware'
import authMiddleware from '../middleware/auth.middleware';
import authorizeAdmin from '../middleware/permission.middleware';

const router = Router()

router.post('/', authMiddleware, authorizeAdmin, validationMiddleware(FixtureDto), FixtureController.addFixture)
router.get('/', authMiddleware, FixtureController.getAllFixtures);
router.get('/pending', authMiddleware, FixtureController.getFixturesByStatus);
router.get('/completed', authMiddleware, FixtureController.getFixturesByStatus);
router.get('/:id', authMiddleware, FixtureController.getFixture);
router.patch('/:id',
  authMiddleware, authorizeAdmin,
  validationMiddleware(UpdateFixtureDto),
  FixtureController.editFixture)
router.delete('/:id',
  authMiddleware, authorizeAdmin,
  FixtureController.deleteFixture)

//     router.get(`/:id`, getPostById);
//     router
//       .all(`/*`, authMiddleware)
//       .patch(`/:id`, validationMiddleware(CreatePostDto, true), modifyPost)
//       .delete(`/:id`, deletePost)
//       .post(, authMiddleware, validationMiddleware(CreatePostDto), createPost);

  // validate.validateParams(validate.schemas.teamIdSchema), 
  



export default router

