import { Router } from "express";
import { AuthRoute } from "../modules/auth/auth.route";
import { ServiceRoute } from "../modules/service/service.route";
import { BookingRoute } from "../modules/booking/booking.route";
import { SlotRoute } from "../modules/slot/slot.route";
import { reviewRoute } from "../modules/review/review.route";


const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: AuthRoute,
    },
    {
        path: '/services',
        route: ServiceRoute,
    },
    {
        path: '/slots',
        route: SlotRoute,
    },
    {
        path: '/',
        route: BookingRoute,
    },
    {
        path: "/reviews",
        route: reviewRoute,
      },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))


export default router;
