import { Router } from 'express'
// import verifyToken from '../middlewares/auth/token.middleware'
import TeamController from '../controllers/team.controller';
import TeamDto from '../dto/team.dto';
import validationMiddleware from '../middleware/validation.middleware'
import authMiddleware from '../middleware/auth.middleware';
import authorizeAdmin from '../middleware/permission.middleware';
// import permissions from '../middlewares/auth/role.middleware'

const router = Router()
// router.post('/teams/',
//   verifyToken.verify,
//   permissions.adminOnly,
//   validate.validateBody(validate.schemas.createTeamSchema),
//   TeamController.addTeam)
router.post('/', authMiddleware, authorizeAdmin, validationMiddleware(TeamDto), TeamController.addTeam)
router.get('/', authMiddleware, TeamController.getALLTeams);
router.get('/:id', authMiddleware, TeamController.getTeam);
router.patch('/:id',
  authMiddleware, authorizeAdmin,
  validationMiddleware(TeamDto),
  TeamController.editTeam)
router.delete('/:id',
  authMiddleware, authorizeAdmin,
  TeamController.deleteTeam)

//     router.get(`/:id`, getPostById);
//     router
//       .all(`/*`, authMiddleware)
//       .patch(`/:id`, validationMiddleware(CreatePostDto, true), modifyPost)
//       .delete(`/:id`, deletePost)
//       .post(, authMiddleware, validationMiddleware(CreatePostDto), createPost);

  // validate.validateParams(validate.schemas.teamIdSchema), 
  



export default router