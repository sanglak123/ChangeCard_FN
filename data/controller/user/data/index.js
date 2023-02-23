import { BankOfUsers, Banks, Cards, Imgs, Payments, Prices, Products, ReceiveBanks, TypeCards, Users, Values } from "data/db/models";

export const UserControllerDatas = {
    LoadingData: async (req, res) => {
        try {
            const listReceiveBank = await ReceiveBanks.findAll({
                include: [{ model: Banks }]
            });

            const listPrices = await Prices.findAll({
                include: [{ model: Cards, include: [{ model: Imgs }] }, { model: Values }]
            });

            const listTypeCards = await TypeCards.findAll();

            const listCards = await Cards.findAll({
                include: [{ model: TypeCards }, { model: Imgs }]
            });

            const listValues = await Values.findAll();

            const listBanks = await Banks.findAll();

            const listProduct = await Products.findAll({
                where: {
                    status: "Success"
                },
                include: [
                    { model: Users },
                    {
                        model: Prices,
                        include: [{ model: Cards }, { model: Values }]
                    }
                ],
                order: [
                    ["id", "desc"]
                ],
                limit: 10
            });

            return res.status(200).json(
                {
                    Prices: listPrices,
                    TypeCards: listTypeCards,
                    Cards: listCards,
                    Values: listValues,
                    Banks: listBanks,
                    Products: listProduct,
                    ReceiveBanks: listReceiveBank
                })
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    LoadDingDataUser: async (req, res) => {
        const { id } = req.query;
        try {
           
            const listBankOfUser = await BankOfUsers.findAll({
                where: {
                    idUser: id
                },
                include: [{ model: Banks }, { model: Users }]
            });
          
            const listProducts = await Products.findAll({
                where: {
                    idUser: id
                },
                include: [{ model: Prices, include: [{ model: Cards }, { model: Values }] }, { model: Users }],
                order: [
                    ["id", "desc"]
                ]
            });        
            const listPayment = await Payments.findAll();
            
            return res.status(200).json({
                BankOfUsers: listBankOfUser,
                Products: listProducts,
                Payments: listPayment
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}