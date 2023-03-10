import 'package:ConnecTen/ProfileScreen/widgets/toggle_button.dart';
import 'package:ConnecTen/Providers/auth_providers.dart';
import 'package:ConnecTen/Providers/connection_provider.dart';
import 'package:ConnecTen/routes/route_path.dart';
import 'package:ConnecTen/utils/fluttertoast.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ConnecTen/ProfileScreen/widgets/profile_header.dart';
import 'package:ConnecTen/ProfileScreen/widgets/social_cards.dart';
import 'package:ConnecTen/Providers/database_provider.dart';
import 'package:ConnecTen/utils/colors.dart';
import 'package:ConnecTen/utils/size_config.dart';
import 'package:ConnecTen/widgets/appbar.dart';
import 'package:ConnecTen/widgets/drawer.dart';
import 'package:toggle_switch/toggle_switch.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const Menu(),
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(screenHeight! * 0.08),
        child: CustomAppbar(context),
      ),
      body: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              margin: EdgeInsets.fromLTRB(30, 20, 30, 25),
              height: screenHeight! * 0.43,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20),
                color: AppColor.primarybgcolor,
                boxShadow: const [
                  BoxShadow(
                    color: Colors.black26,
                    blurRadius: 20.0,
                  ),
                ],
              ),
              child: Stack(
                children: [
                  ToggleButton(),
                  // LockButton(),
                  //Stack 2
                  const ProfileHeaderWidget(),
                ],
              ),
            ),
            LockButton(),
            socialCard(context),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.pushNamed(context, RoutePath.routeToFormScreen);
        },
        child: const Icon(Icons.edit),
        backgroundColor: AppColor.buttoncolor,
      ),
    );
  }
}

class LockButton extends ConsumerWidget {
  const LockButton({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final _userDetails = ref.watch(userDetailsProvider);
    final _databaseUser = ref.watch(databaseProvider);
    final cp = ref.watch(connectionProvider);
    final _authUser = ref.watch(authUserProvider);

    return _userDetails.when(
      data: (userData) {
        return Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Icon(userData.isPrivate ? Icons.lock_rounded : Icons.lock_open_rounded,
            //   color: userData.isPrivate ? AppColor.secbgcolor : Colors.black,
            // ),
            ToggleSwitch(
              minWidth: screenWidth! * 0.16,
              minHeight: screenHeight! * 0.04,
              activeBgColors: const [
                [AppColor.buttoncolor],
                [AppColor.buttoncolor]
              ],
              activeFgColor: Colors.white,
              inactiveBgColor: AppColor.cardcolor,
              inactiveFgColor: Colors.black,
              initialLabelIndex: userData.isPrivate ? 1 : 0,
              totalSwitches: 2,
              fontSize: 9,
              labels: ['PUBLIC', 'PRIVATE'],
              onToggle: (index) {
                _userDetails.value!.isPrivate = !_userDetails.value!.isPrivate;
                _databaseUser.updateUserData(_userDetails.value!);
                _userDetails.value!.isPrivate
                    ? {toastWidget("Profile Locked")}
                    : toastWidget("Profile Unlocked");
              },
            ),
            // _userDetails.when(
            //   loading: () {
            //     return const Scaffold(
            //       body: Center(
            //         child: CircularProgressIndicator(
            //           color: Colors.blue,
            //         ),
            //       ),
            //     );
            //   },
            //   error: (err, stack) => Text('Error: $err'),
            //   data: (currentUser) => ElevatedButton(
            //       style: ElevatedButton.styleFrom(
            //         backgroundColor:
            //             currentUser.coins >= 500 ? Colors.blue : Colors.grey,
            //         shape: RoundedRectangleBorder(
            //           borderRadius: BorderRadius.circular(10.0),
            //         ),
            //       ),
            //       onPressed: () {
            //         cp.disableDiscovery();
            //         cp.enableAdvertising(_authUser.uid, false, null);
            //       },
            //       child: Text("BURST")),
            // ),
            // Icon(userData.isPrivate ? Icons.lock_rounded : Icons.lock_open_rounded,
            //   color: userData.isPrivate ? Colors.black : AppColor.secbgcolor,
            // ),
            // Container(
            //   decoration: BoxDecoration(
            //     shape: BoxShape.circle,
            //     color: AppColor.buttoncolor,
            //   ),
            //   child: IconButton(
            //     icon: Icon(userData.isPrivate ? Icons.lock_rounded : Icons.lock_open_rounded,
            //     ),
            //     onPressed: (){
            //       _userDetails.value!.isPrivate = !_userDetails.value!.isPrivate;
            //       _databaseUser.updateUserData(_userDetails.value!);
            //       _userDetails.value!.isPrivate ? {toastWidget("Profile Locked")
            //       } : toastWidget("Profile Unlocked");
            //     },
            //   ),
            // )
            // icon: Icon(profileState ? Icons.lock_rounded : Icons.lock_open_rounded,)),
          ],
        );
      },
      error: (err, stack) => Text('Error: $err'),
      loading: () {
        return const Center(
          child: CircularProgressIndicator(
            color: Colors.blue,
          ),
        );
      },
    );
  }
}
