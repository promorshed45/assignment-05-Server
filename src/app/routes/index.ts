import { Router } from "express";
import { AuthRoute } from "../modules/auth/auth.route";
import { ServiceRoute } from "../modules/service/service.route";
import { BookingRoute } from "../modules/booking/booking.route";
import { SlotRoute } from "../modules/slot/slot.route";
import { ReviewRoute } from "../modules/review/review.route";
import { UserRoute } from "../modules/user/user.route";
import { PaymentRoute } from "../modules/payment/payment.route";


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
        route: ReviewRoute,
    },
    {
        path: "/users",
        route: UserRoute,
    },
    {
        path: "/payment",
        route: PaymentRoute,
    },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))


export default router;
