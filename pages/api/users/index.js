const db = require("../../../models");
const responseHandler = require("../utils/responseHandler");
export const config = {
  api: {
    bodyParser: false,
  },
}

const userHandler = async (req, res) => {
  try {
    switch (req.method) {
      case "GET":
        // if (!req.query.courseId) {
        //   throw new Error("Query parameter courseId required");
        // }
        let params = {};
        if (req.query.courseId) {
          params.courseId = req.query.courseId;
        }
        if (req.query.enrollment) {
          params.enrollment = req.query.enrollment;
        }
        let users = await db.users.findAll({
          where: params,
        });
          // let users = await db.users.findAll()
        // if (!req.query.courseId) {
        //   throw new Error("Query parameter courseId required");
        // }

        // const courseEnrollmentParams = {
        //   where: { courseId: req.query.courseId }
        // };
        // if (req.query.enrollment) {
        //   courseEnrollmentParams.where.enrollment = req.query.enrollment;
        // }

        // let groupEnrollmentParams = {};
        // if (req.query.groupId) {
        //   groupEnrollmentParams = { where: { groupId: req.query.groupId } };
        // }

        // let users = await db.users.findAll({
        //   include: [
        //     {
        //       model: db.course_enrollments,
        //       attributes: ["courseId", "enrollment"],
        //       ...courseEnrollmentParams
        //     },
        //     {
        //       model: db.group_enrollments,
        //       attributes: ["groupId"],
        //       ...groupEnrollmentParams
        //     }
        //   ]
        // });
        responseHandler.response200(res, users);
        break;

      case "POST":
        if (req.query.type === "multiple") {
          await Promise.all(req.body.map(user => db.users.create(user)));
        } else {
          await db.users.create(req.body);
        }
        responseHandler.msgResponse201(
          res,
          "Successfully created database entries."
        );
        break;

      default:
        throw new Error("Invalid HTTP method");
    }
  } catch (err) {
    responseHandler.response400(res, err);
  }
};

export default userHandler;
